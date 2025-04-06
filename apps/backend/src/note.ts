import { Elysia, t } from "elysia";
import { getUserId, userService } from "./user";

const memo = t.Object({
  data: t.String(),
  author: t.String(),
});

type Memo = typeof memo.static;

class Note {
  constructor(
    public data: Memo[] = [
      {
        data: "Moonhalo",
        author: "saltyaom",
      },
    ],
  ) {}

  add(note: Memo) {
    this.data.push(note);

    return this.data;
  }

  remove(index: number) {
    return this.data.splice(index, 1);
  }

  update(index: number, note: Partial<Memo>) {
    this.data[index] = { ...this.data[index], ...note };
    return this.data[index];
  }
}

export const note = new Elysia({
  prefix: "/note",
})
  .use(userService)
  .decorate("note", new Note())
  .model({
    memo: t.Omit(memo, ["author"]),
  })
  .onTransform(function log({ body, params, path, request: { method } }) {
    console.log(`${method} ${path}`, {
      body,
      params,
    });
  })
  .get("/", ({ note }) => note.data)
  .use(getUserId)
  .put(
    "/",
    ({ note, body: { data }, username }) =>
      note.add({ data, author: username }),
    {
      body: "memo",
    },
  )
  .guard({
    params: t.Object({
      index: t.Number(),
    }),
  })
  .get("/:index", ({ note, params: { index }, error }) => {
    return note.data[index] ?? error(404, "oh no :(");
  })
  .delete("/:index", ({ note, params: { index }, error }) => {
    if (index in note.data) return note.remove(index);

    return error(422);
  })
  .patch(
    "/:index",
    ({ note, params: { index }, body: { data }, error, username }) => {
      if (index in note.data)
        return note.update(index, {
          author: username,
          data,
        });

      return error(422);
    },
    {
      body: "memo",
      isSignIn: true,
    },
  );

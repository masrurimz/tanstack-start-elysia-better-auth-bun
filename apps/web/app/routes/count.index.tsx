import { createFileRoute } from "@tanstack/react-router";
import { CountHub } from "~/features/count/_components/count-hub";

export const Route = createFileRoute("/count/")({
	component: CountHub,
});

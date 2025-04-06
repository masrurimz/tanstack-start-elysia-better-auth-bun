export interface Count {
	value: number;
}

export interface CountResponse {
	count: number;
}

export interface CountIncrementResponse {
	success: boolean;
	message: string;
	count: number;
}

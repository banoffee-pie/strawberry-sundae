export declare const octokit: import("@octokit/core").Octokit & import("@octokit/plugin-rest-endpoint-methods/dist-types/types").Api & {
    paginate: import("@octokit/plugin-paginate-rest").PaginateInterface;
};
export declare function getBranch(): Promise<string>;
export declare function getCommand(): string;
export declare function getCommentAuthorAssoc(comment: {
    [key: string]: any;
    id: number;
} | undefined): any;
export declare function isCommenterCollaborator(): boolean;

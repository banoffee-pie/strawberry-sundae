export declare const octokit: import("@octokit/core").Octokit & import("@octokit/plugin-rest-endpoint-methods/dist-types/types").Api & {
    paginate: import("@octokit/plugin-paginate-rest").PaginateInterface;
};
export declare function getBranch(): Promise<string>;
export declare function getCommand(): string;
declare enum commentAuthorAssoc {
    COLLABORATOR = "COLLABORATOR",
    CONTRIBUTOR = "CONTRIBUTOR",
    FIRST_TIMER = "FIRST_TIMER",
    FIRST_TIME_CONTRIBUTOR = "FIRST_TIME_CONTRIBUTOR",
    MANNEQUIN = "MANNEQUIN",
    MEMBER = "MEMBER",
    NONE = "NONE",
    OWNER = "OWNER"
}
export declare function getCommentAuthorAssoc(comment: {
    [key: string]: any;
    id: number;
} | undefined): commentAuthorAssoc;
export declare function isCommenterCollaborator(): boolean;
export {};

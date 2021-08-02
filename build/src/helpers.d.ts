export declare const octokit: import("@octokit/core").Octokit & import("@octokit/plugin-rest-endpoint-methods/dist-types/types").Api & {
    paginate: import("@octokit/plugin-paginate-rest").PaginateInterface;
};
export declare function getBranch(): Promise<string>;
export declare function getCommand(): string;
declare enum commentAuthorAssoc {
    COLLABORATOR = 0,
    CONTRIBUTOR = 1,
    FIRST_TIMER = 2,
    FIRST_TIME_CONTRIBUTOR = 3,
    MANNEQUIN = 4,
    MEMBER = 5,
    NONE = 6,
    OWNER = 7
}
export declare function getCommentAuthorAssoc(comment: {
    [key: string]: any;
    id: number;
} | undefined): commentAuthorAssoc;
export declare function isCommenterCollaborator(): boolean;
export {};

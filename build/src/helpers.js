"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCommenterCollaborator = exports.getCommentAuthorAssoc = exports.getCommand = exports.getBranch = exports.octokit = void 0;
// Gets the branch that the PR is merging from
const github_1 = require("@actions/github");
const core = require("@actions/core");
const inputs_1 = require("./inputs");
exports.octokit = github_1.getOctokit(inputs_1.token);
async function getBranch() {
    try {
        // Use context info to get the head reference for source branch of PR
        return exports.octokit.rest.pulls
            .get({
            owner: github_1.context.issue.owner,
            repo: github_1.context.issue.repo,
            pull_number: github_1.context.issue.number,
        })
            .then((resp) => {
            return Promise.resolve(resp.data.head.ref);
        });
    }
    catch (error) {
        core.setFailed(error.message);
        return Promise.reject();
    }
}
exports.getBranch = getBranch;
// Returns first line of comment if it starts with a slash, empty string otherwise
function getCommand() {
    if (github_1.context.payload.comment === undefined)
        throw new Error('context.payload.comment is undefined.');
    const comment = github_1.context.payload.comment.body;
    if (comment[0] === '/')
        return comment.split(/[\n\r]/)[0];
    return '';
}
exports.getCommand = getCommand;
var commentAuthorAssoc;
(function (commentAuthorAssoc) {
    commentAuthorAssoc[commentAuthorAssoc["COLLABORATOR"] = 0] = "COLLABORATOR";
    commentAuthorAssoc[commentAuthorAssoc["CONTRIBUTOR"] = 1] = "CONTRIBUTOR";
    commentAuthorAssoc[commentAuthorAssoc["FIRST_TIMER"] = 2] = "FIRST_TIMER";
    commentAuthorAssoc[commentAuthorAssoc["FIRST_TIME_CONTRIBUTOR"] = 3] = "FIRST_TIME_CONTRIBUTOR";
    commentAuthorAssoc[commentAuthorAssoc["MANNEQUIN"] = 4] = "MANNEQUIN";
    commentAuthorAssoc[commentAuthorAssoc["MEMBER"] = 5] = "MEMBER";
    commentAuthorAssoc[commentAuthorAssoc["NONE"] = 6] = "NONE";
    commentAuthorAssoc[commentAuthorAssoc["OWNER"] = 7] = "OWNER";
})(commentAuthorAssoc || (commentAuthorAssoc = {}));
// https://docs.github.com/en/graphql/reference/enums#commentauthorassociation
function getCommentAuthorAssoc(comment) {
    if (comment === undefined)
        throw new Error('context.payload.comment is undefined.');
    let assoc;
    switch (comment.author_association) {
        case 'COLLABORATOR':
            assoc = commentAuthorAssoc.COLLABORATOR;
            break;
        case 'CONTRIBUTOR':
            assoc = commentAuthorAssoc.CONTRIBUTOR;
            break;
        case 'FIRST_TIMER':
            assoc = commentAuthorAssoc.FIRST_TIMER;
            break;
        case 'FIRST_TIME_CONTRIBUTOR':
            assoc = commentAuthorAssoc.FIRST_TIME_CONTRIBUTOR;
            break;
        case 'MANNEQUIN':
            assoc = commentAuthorAssoc.MANNEQUIN;
            break;
        case 'MEMBER':
            assoc = commentAuthorAssoc.MEMBER;
            break;
        case 'NONE':
            assoc = commentAuthorAssoc.NONE;
            break;
        case 'OWNER':
            assoc = commentAuthorAssoc.NONE;
            break;
        default:
            throw new Error("Unrecognised user association: " + comment.author_association);
    }
    return assoc;
}
exports.getCommentAuthorAssoc = getCommentAuthorAssoc;
// returns true if comment author is owner or collaborator or member
function isCommenterCollaborator() {
    if (github_1.context.payload.comment === undefined)
        throw new Error('context.payload.comment is undefined.');
    return (getCommentAuthorAssoc(github_1.context.payload.comment) === commentAuthorAssoc.COLLABORATOR ||
        getCommentAuthorAssoc(github_1.context.payload.comment) === commentAuthorAssoc.MEMBER ||
        getCommentAuthorAssoc(github_1.context.payload.comment) === commentAuthorAssoc.OWNER);
}
exports.isCommenterCollaborator = isCommenterCollaborator;
//# sourceMappingURL=helpers.js.map
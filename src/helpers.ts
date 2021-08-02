// Gets the branch that the PR is merging from
import {getOctokit, context} from '@actions/github';
import * as core from '@actions/core';
import {token} from './inputs';

export const octokit = getOctokit(token);

export async function getBranch(): Promise<string> {
  try {
    // Use context info to get the head reference for source branch of PR
    return octokit.rest.pulls
      .get({
        owner: context.issue.owner,
        repo: context.issue.repo,
        pull_number: context.issue.number,
      })
      .then((resp: {data: {head: {ref: string}}}): Promise<string> => {
        return Promise.resolve(resp.data.head.ref);
      });
  } catch (error) {
    core.setFailed(error.message);
    return Promise.reject();
  }
}

// Returns first line of comment if it starts with a slash, empty string otherwise
export function getCommand(): string {
  if (context.payload.comment === undefined)
    throw new Error('context.payload.comment is undefined.');

  const comment: string = context.payload.comment.body;
  if (comment[0] === '/') return comment.split(/[\n\r]/)[0];
  return '';
}

enum commentAuthorAssoc {
  COLLABORATOR = 'COLLABORATOR',
  CONTRIBUTOR = 'CONTRIBUTOR',
  FIRST_TIMER = 'FIRST_TIMER',
  FIRST_TIME_CONTRIBUTOR = 'FIRST_TIME_CONTRIBUTOR',
  MANNEQUIN = 'MANNEQUIN',
  MEMBER = 'MEMBER',
  NONE = 'NONE',
  OWNER = 'OWNER',
}

// https://docs.github.com/en/graphql/reference/enums#commentauthorassociation
export function getCommentAuthorAssoc(
  comment: {[key: string]: any; id: number} | undefined
): commentAuthorAssoc {
  if (comment === undefined)
    throw new Error('context.payload.comment is undefined.');

  let assoc: commentAuthorAssoc;
  console.log(comment.author_association);
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
      throw new Error(
        'Unrecognised user association: ' + comment.author_association
      );
  }
  return assoc;
}

// returns true if comment author is owner or collaborator or member
export function isCommenterCollaborator(): boolean {
  const {comment} = context.payload;

  if (comment === undefined)
    throw new Error('context.payload.comment is undefined.');

  const assoc = getCommentAuthorAssoc(comment);
  console.info(`The commenter association is ${assoc}`);

  return [
    commentAuthorAssoc.COLLABORATOR,
    commentAuthorAssoc.MEMBER,
    commentAuthorAssoc.OWNER,
  ].includes(assoc);
}

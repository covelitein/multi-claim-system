import type {
  FollowUp,
  WalkthroughQuestion,
} from "@/lib/dashboard/claim-walkthrough-data";

type Answers = Record<string, string>;

/** Follow-up groups that apply to the current answers. */
export function visibleFollowUps(
  question: WalkthroughQuestion,
  answers: Answers,
): FollowUp[] {
  const chosen = answers[question.id];
  if (!chosen) return [];
  return (question.followUps ?? []).filter(
    (group) =>
      group.optionId === chosen &&
      (!group.when || answers[group.when.fieldId] === group.when.value),
  );
}

export function isQuestionComplete(
  question: WalkthroughQuestion,
  answers: Answers,
) {
  if (!answers[question.id]) return false;
  return visibleFollowUps(question, answers).every((group) =>
    group.fields.every(
      (field) => field.optional || Boolean(answers[field.id]?.trim()),
    ),
  );
}

export function optionLabel(question: WalkthroughQuestion, answers: Answers) {
  return question.options.find((o) => o.id === answers[question.id])?.label;
}

/** 2026-08-01 -> 08/01/2026. Leaves anything else untouched. */
export function formatDate(value: string | undefined) {
  if (!value) return "";
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return match ? `${match[2]}/${match[3]}/${match[1]}` : value;
}

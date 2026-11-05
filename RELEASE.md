# OOPoman releases

## What is a release?

A release is a saved and successfully deployed version of the existing OOPoman Site in Sites. A local build or a saved-but-undeployed Site version is not a release.

## Audience

Keep the existing OOPoman Site public at `https://oopoman-course.epichorse4.chatgpt.site`. A release does not change access settings, add learner accounts, or send learner progress or exam results to a service.

## Version scheme

Use the monotonically increasing version number assigned by Sites. Do not create a separate semantic version, Git tag, or manually named release. The current Site version is 5; the next saved Site version is v6.

## Release triggers

Prepare a release only after Roman explicitly requests a Sites publication for a specific source scope. The request to publish v6 is the trigger for the current exam update; it does not approve unrelated local changes.

## Pre-release checklist

1. Confirm the selected Site is the existing OOPoman project, its latest saved version is the expected predecessor, and its audience remains public.
2. Select only approved, in-scope source files. Exclude untracked certificates, scratch files, learner data, and unrelated worktree changes.
3. For a TFW Full result, confirm its governing TS, RF, evidence and independent REVIEW permit publication. For exam changes, run a representative timed attempt to establish the 60-minute fit. Roman may replace that timing gate with an explicit, release-specific waiver recorded in `TRACE.md`; a waiver is not evidence that fit was measured.
4. Build the static output with `node scripts/build-site.mjs`. Resolve build errors before packaging.
5. Check the built output in a browser: course home and exam navigation load; the exam page and worker load; Python runtime starts; practical checks return criterion-level feedback, including errors from unfinished student code; and resetting progress also clears the local exam state.
6. Verify the selected source commit is the current HEAD of the Site's configured source branch. Build the deployment archive from that same commit and include the expected static output.
7. Save a Sites version and confirm the returned version number is v6 before deploying it. Keep the existing public audience unchanged.

## Release steps

Read the existing Site and its version history first. For repository-based Sites, push the exact selected source commit before saving a version. Save the archive-backed version through Sites, deploy that saved version, and verify a successful terminal deployment status. Preserve the previous saved version for rollback.

Record the deployed version number, source commit, archive identity, checks, deployment result and live URL in `CHANGELOG.md`. Do not describe a local build or an undeployed saved version as published.

## Current v6 disposition

The OOPoman Site is public at `https://oopoman-course.zetex401.chatgpt.site`; Sites v6 is deployed from source commit `8044e7f033ecd04603c17e59b576020315e85685` with archive hash `sha256:a0662592a905a74752cc8191865b342ba6d609ab02e1154c0034238750e26570`. Deployment `appgdep_6aecbbbacd488191bbcb139bf2ce3ab0` succeeded. Roman explicitly waived the representative 60-minute fit run for v6; duration remains unmeasured and is not claimed as verified. Future exam releases still require a timed run or an explicit release-specific owner waiver.

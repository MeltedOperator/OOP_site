# Map — bounded F4 return verification
> Dispatch: `journal/20261030-034840__dispatch__review-f4-final.md @ 1135538dd15859ccabde78078923b63b27e36063`
> Prior review: `REVIEW__phase-b__терминалы_модуля_1__rev3.md @ 55e7f4848d3b872c58ba11743154c84f60d06652`
> Corrected RF/EV: current at dispatch epoch `1135538…`; Candidate `c1acf55e81f9ec4927f883034eaba92de2214ebf`
> Governing TS rev2: `156ee785c7043747ab231d801240d4c68e041afa`; owner gate `cd3983e2442d0a696b04fdb611165f5c94044228`

## Understanding
This is a bounded check of the accepted F4 record-only correction. The rev3 product and assurance judgments remain applicable because Candidate `c1acf55…` and its VALUE/ASSURANCE content did not change; this check verifies only the RF/EV current summary identities and their history labels.

## F4 completion condition
- Current RF/EV summaries identify TS rev2 `156ee…`, owner gate `cd3983…`, Candidate `c1acf…`, and the final current RF status epoch `6a0dd0…`.
- The former `20c284d…` status is explicitly identified as the correction-entry/authorization snapshot.
- Rev1 authority and earlier Candidate accounting rows are explicitly historical; rev2 Candidate accounting remains current.
- Current status is RF under the canonical return event. No VALUE/ASSURANCE content or Candidate changes.

Stage complete: YES — bounded F4 check only.

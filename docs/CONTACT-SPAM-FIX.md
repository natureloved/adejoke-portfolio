# Contact-form spam: what was done, what only you can do

Context: Formspree notifications kept arriving with a name like `dugegie`, a
throwaway gmail address, and gibberish in the message body, carrying a
submission URL ending in `multimodal-agentic-generation-preview.mangovibe.net`.

Diagnosis, in short: **your inbox was not compromised and your repo was never
involved.** The sending form is not a build of this site. The decisive evidence
was the field names — that form sends `project_type` while this one sends
`kind`, and it does not carry the `company_website` honeypot, so the honeypot
never fired for it. The host was also never present anywhere in git history
(`git grep` across every commit is empty). A Formspree endpoint id is public by
design, so any copy of the site, old or foreign, can keep posting to it forever.

## Fixed in code (this commit)

**A time-to-submit guard, alongside the existing honeypot.** A form that is
rendered, filled, and posted in under three seconds was never read by a person.
The clock starts when the dialog opens, not at page load, because the form only
exists for a human once it is in front of them.

This matters more than the honeypot did, for one reason: **the honeypot is keyed
to a field name that only a build of this source carries.** An older or foreign
build of the site posts straight past it. A timing check depends on no field
existing at all — it measures the one thing every sender must do, which is take
time to arrive.

A blocked submission gets the same "sent" message a human gets. Replying
"rejected" only teaches the sender how to rephrase.

**Scope, stated plainly:** this protects builds created from this source. It
does nothing to an already-deployed foreign copy. That is what the next section
is for.

## Only you can do this (Formspree dashboard)

This is the control that actually ends it, because it protects against any
sender including builds that will never be rebuilt:

1. **Turn on Formspree's spam protection / reCAPTCHA** on the endpoint. In the
   Formspree dashboard, open the form, and enable the captcha or spam-filter
   option. Future posts from unverified senders are held or dropped before they
   reach the inbox.
2. **Optional: rotate the endpoint.** Create a new form, point
   `NEXT_PUBLIC_FORMSPREE_URL` at the new id, and redeploy. Every existing
   sender is cut off instantly. It will not stop a future copy of the site, so
   step 1 is still worth doing.

Until one of those is done, submissions from that host will keep arriving — the
code fix above only stops builds made from this source.

## Inbox rule (symptom relief, stops nothing)

Create a filter in your mail client that auto-archives Formspree notifications
matching the sender host:

```
From:        Formspree
Body/URL contains:  mangovibe.net
Action:      Skip Inbox / Apply label "Contact spam"
```

That keeps the inbox clean while the dashboard change is pending. It does not
reduce the number of submissions.

## Verifying the fix

```bash
npm run typecheck
npm run lint
npm run build
npm test          # includes the a11y and interactions specs
```

To see the guard work by hand: open the dialog and post immediately — you get
the success message and nothing is sent. Wait three seconds and post normally —
it sends as before.

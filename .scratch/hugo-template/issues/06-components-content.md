# 06. Partials: FullBleed, Figure, Quote, Aside, Article, Card (link, post, form)

Status: resolved
Blocked by: 04
Spec: ../spec.md

Same rules. Figure with Hugo image processing (srcset, intrinsic size, ratios). Post card actions Share/Embed/Copy link (+optional Reply), no counts. Form card with configurable action.

**Done when:** each matches its reference at 375/768/1280, light and dark.

## Answer

Added `layouts/_partials/{fullbleed,figure,quote,aside,article,card-link,card-post,card-form}.html`, all taking a dict (or page) context, markup matching `design-system/reference/`. Figure/FullBleed/card-link use Hugo image processing (webp srcset, intrinsic width/height, lazy except hero). Post card: Share/Embed/Copy link rendered `hidden` for JS enhancement, optional Reply from `params.notes.replyTo`, no counts (ADR-0005), h-entry microformats. Form card action from `params.contact.action` (default `mailto:`). Verified by a temporary page in exampleSite (`hugo --gc --minify`, no warnings); temp files removed.

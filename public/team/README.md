# Team Photos

Drop replacement photos directly into this folder using these exact filenames:

```
member1.jpg   — Muhammad Faizan
member2.jpg   — Sheikh Sameer Jaswal
member3.jpg   — Ahmad Ali
member4.jpg   — Hassan Raza
```

No code changes needed — the Team section reads these paths automatically.

## Guidelines

- **Format:** `.jpg` (filenames are hardcoded with this extension — if you use `.png` or `.webp`, update the `image` path for that person in `src/lib/content.ts`)
- **Aspect ratio:** portrait, ideally close to 4:5 (e.g. 1000×1250px) — this matches the card's crop
- **File size:** keep under ~500KB per photo for fast page loads; compress with a tool like Squoosh or TinyPNG first
- **Missing file:** if a file is deleted or renamed, that card automatically falls back to a professional avatar icon — nothing breaks

## Adding or removing team members

To add a 5th member or change names/roles/bios, edit `teamMembers` in `src/lib/content.ts`. Each entry needs a `name`, `role`, `bio`, and `image` path pointing into this folder.

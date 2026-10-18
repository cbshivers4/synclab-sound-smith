<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep official product screenshots in the centralized product image configuration and serve uploaded media through asset pointers, so gallery and featured imagery stay consistent without storing binaries in source control.
- All public software-download controls use the shared email gate and a dedicated server function that selects a fixed template and configured package, so browser input cannot choose email content or arbitrary download links.
- Send app emails synchronously through the managed send helper; never add email queues or email storage tables because delivery and suppression are managed by the email service.

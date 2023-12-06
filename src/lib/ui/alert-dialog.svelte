<script lang="ts">
  let { title: _title, open: _open, children } = $props<{
    title: string;
    open: boolean;
    children: any;
  }>();
  import { createDialog, melt } from "@melt-ui/svelte";
  const {
    elements: {
      trigger,
      portalled,
      overlay,
      content,
      title,
      description,
      close,
    },
    states: { open },
  } = createDialog({
    role: "alertdialog",
    forceVisible: true,
    defaultOpen: _open,
    onOpenChange: ({next}) => {
        _open = next;
        return next;
    }
  });

  $effect(() => {
    open.set(_open);
  });
</script>

<div use:melt={$portalled}>
  {#if $open}
    <div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" />
    <div
      use:melt={$content}
      class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
    max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white
    p-6 shadow-lg"
    >
      <h2
        class="m-0 text-lg font-medium text-black tracking-tight"
        use:melt={$title}
      >
        {_title}
      </h2>
      <!-- <slot close={$close} /> -->
      {@render children(close)}
    </div>
  {/if}
</div>

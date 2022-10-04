<script>
    import Button from "$lib/forms/button.svelte";
    import {iconClose} from "./icons.js";

    export let closing = false;
    export let onClose;
    export let visible, title;

    function close() {
        if (closing) return;


        closing = true;
        setTimeout(() => {
            visible = false;
            if (onClose) onClose();
        }, 400);
    }
</script>

<div class="overlay" class:closing={closing}>
    <div class="container">
        <div class="content">
            <div class="title">
                <h1>{title}</h1>
                <Button icon={iconClose} color="icon" callback={close}/>
            </div>

            <slot name="content" />

        </div>
        <div class="footer">
           <slot name="footer" />
        </div>
    </div>
</div>


<style lang="scss">
  .overlay.closing {
    animation: fadeOut 0.4s ease forwards !important;

    .container {
      animation: fadeScaleOut 0.4s ease forwards;
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.32);
    z-index: 10;
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    opacity: 0;
    animation: fadeIn 0.4s ease forwards;
  }

  .container {
    min-width: 500px;
    min-height: 200px;
    background-color: white;
    z-index: 11;
    border-radius: 1rem;
    box-shadow: 0 11px 15px -7px #0003, 0 24px 38px 3px #00000024, 0 9px 46px 8px #0000001f;
    animation: fadeScaleIn 0.4s ease forwards;
    display: flex;
    flex-direction: column;

    .footer {
      background-color: #f8fafc;
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      div {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    }

    .content {
      padding: 2rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;

        h1 {
          font-weight: 500;
          line-height: 1.5rem;
          font-size: 1.125rem;
        }
      }

    }
  }


  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeScaleIn {
    from {
      opacity: 0;
      transform: scale(0.7);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes fadeScaleOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.7);
    }
  }
</style>
<script>
    export let size = "100px";
    export let color = "#3f51b5";
</script>

<div role="progressbar" tabindex="-1"
     class="mat-progress-spinner mat-spinner mat-primary mat-progress-spinner-indeterminate-animation"
     mode="indeterminate" style="width: {size};height: {size};">
    <svg style="width: {size};height: {size};" preserveAspectRatio="xMidYMid meet" focusable="false"
         aria-hidden="true" viewBox="0 0 100 100">
        <circle cx="50%" cy="50%" r="45" class="ng-star-inserted" stroke={color}></circle></svg>
</div>

<style>
    .mat-progress-spinner[mode=indeterminate] svg {
        animation: mat-progress-spinner-linear-rotate 2000ms linear infinite;
    }

    .mat-progress-spinner svg {
        position: absolute;
        transform: rotate(-90deg);
        top: 0;
        left: 0;
        transform-origin: center;
        overflow: visible;
    }

    .mat-progress-spinner {
        width: 100px;
        height: 100px;
        display: block;
        position: relative;
        overflow: hidden;
    }

    .mat-progress-spinner circle, .mat-spinner circle {
        animation-name: mat-progress-spinner-stroke-rotate-100;
        stroke-dasharray: 282.743px;
        stroke-width: 10%;
        transform-origin: 50% 50%;
    }

    .mat-progress-spinner circle {
        fill: rgba(0, 0, 0, 0);
        transition: stroke-dashoffset 225ms linear;
    }

    .mat-progress-spinner[mode=indeterminate] circle {
        transition-property: stroke;
        animation-duration: 4000ms;
        animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
        animation-iteration-count: infinite;
    }

    @keyframes mat-progress-spinner-linear-rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes mat-progress-spinner-stroke-rotate-100 {
        0% {
            stroke-dashoffset: 268.606171575px;
            transform: rotate(0);
        }
        12.5% {
            stroke-dashoffset: 56.5486677px;
            transform: rotate(0);
        }
        12.5001% {
            stroke-dashoffset: 56.5486677px;
            transform: rotateX(180deg) rotate(72.5deg);
        }
        25% {
            stroke-dashoffset: 268.606171575px;
            transform: rotateX(180deg) rotate(72.5deg);
        }
        25.0001% {
            stroke-dashoffset: 268.606171575px;
            transform: rotate(270deg);
        }
        37.5% {
            stroke-dashoffset: 56.5486677px;
            transform: rotate(270deg);
        }
        37.5001% {
            stroke-dashoffset: 56.5486677px;
            transform: rotateX(180deg) rotate(161.5deg);
        }
        50% {
            stroke-dashoffset: 268.606171575px;
            transform: rotateX(180deg) rotate(161.5deg);
        }
        50.0001% {
            stroke-dashoffset: 268.606171575px;
            transform: rotate(180deg);
        }
        62.5% {
            stroke-dashoffset: 56.5486677px;
            transform: rotate(180deg);
        }
        62.5001% {
            stroke-dashoffset: 56.5486677px;
            transform: rotateX(180deg) rotate(251.5deg);
        }
        75% {
            stroke-dashoffset: 268.606171575px;
            transform: rotateX(180deg) rotate(251.5deg);
        }
        75.0001% {
            stroke-dashoffset: 268.606171575px;
            transform: rotate(90deg);
        }
        87.5% {
            stroke-dashoffset: 56.5486677px;
            transform: rotate(90deg);
        }
        87.5001% {
            stroke-dashoffset: 56.5486677px;
            transform: rotateX(180deg) rotate(341.5deg);
        }
        100% {
            stroke-dashoffset: 268.606171575px;
            transform: rotateX(180deg) rotate(341.5deg);
        }
    }
</style>
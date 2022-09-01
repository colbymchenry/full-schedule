<section>
    <div class="container">
        <div class="header">
            <div>
                <div class="text-4xl tracking-tight text-secondary">
                    INVOICE
                </div>
                <div class="text-4xl" contenteditable>
                    #0-0001
                </div>
                <div class="font-medium tracking-tight text-secondary">INVOICE DATE</div>
                <div class="font-medium" contenteditable>Jul 19, 2022</div>
                <div class="font-medium tracking-tight text-secondary">DUE DATE</div>
                <div class="font-medium" contenteditable>Aug 19, 2022</div>
                <div class="font-medium tracking-tight text-secondary">TOTAL DUE</div>
                <div class="font-medium" contenteditable>$235,000.00</div>
            </div>
            <div>
                <div class="w-24" style="place-self: center;"><img src="/logo.svg" class="w-24" alt=""></div>
                <div class="info">
                    <div class="font-medium" contenteditable>Colby McHenry</div>
                    <div contenteditable>755 North Ave NE #2322</div>
                    <div contenteditable>Atlanta, GA 30306</div>
                    <div contenteditable>+1 470 495 5859</div>
                    <div contenteditable>me@colbymchenry.com</div>
                    <div contenteditable>www.colbymchenry.com</div>
                </div>
            </div>
        </div>
        <div class="text-md gap-2">
            <div class="text-xl font-medium" contenteditable>Client Name</div>
            <div contenteditable>9301 Wood Street Philadelphia, PA 19111</div>
            <div contenteditable>hughes.brian@company.com</div>
            <div contenteditable>+55 552 455 87</div>
        </div>

        <div class="grid grid-cols-12 gap-x-1 mt-12">
            <div class="col-span-8 font-medium text-md text-secondary">SERVICE</div>
            <div class="font-medium text-md text-right text-secondary">RATE</div>
            <div class="font-medium text-md text-right text-secondary">QTY</div>
            <div class="col-span-2 font-medium text-md text-right text-secondary">TOTAL</div>
            <div class="col-span-12 my-4 border-b"></div>
            <div class="col-span-8 text-lg font-medium" contenteditable>Prototype &amp; Design</div>
            <div class="self-center text-right" contenteditable>$75.00</div>
            <div class="self-center text-right" contenteditable>240</div>
            <div class="col-span-2 self-center text-right" contenteditable>$18,000.00</div>
            <div class="col-span-12 my-4 border-b"></div>
            <div class="col-span-8 text-lg font-medium" contenteditable>Development</div>
            <div class="self-center text-right" contenteditable>$60.50</div>
            <div class="self-center text-right" contenteditable>350</div>
            <div class="col-span-2 self-center text-right" contenteditable>$21,175.00</div>
            <div class="col-span-12 my-4 border-b"></div>
            <div class="col-span-8 text-lg font-medium" contenteditable>Testing</div>
            <div class="self-center text-right" contenteditable>$25.00</div>
            <div class="self-center text-right" contenteditable>50</div>
            <div class="col-span-2 self-center text-right" contenteditable>$1,250.00</div>
            <div class="col-span-12 my-4 border-b"></div>
            <div class="col-span-8 text-lg font-medium" contenteditable>Documentation &amp; Training</div>
            <div class="self-center text-right" contenteditable>$26.50</div>
            <div class="self-center text-right" contenteditable>260</div>
            <div class="col-span-2 self-center text-right" contenteditable>$6,890.00</div>
            <div class="col-span-12 my-4 border-b"></div>
            <div class="col-span-8 text-lg font-medium" contenteditable>Critical bug fixes for a year</div>
            <div class="self-center text-right" contenteditable>$25,000</div>
            <div class="self-center text-right" contenteditable>2</div>
            <div class="col-span-2 self-center text-right" contenteditable>$50,000.00</div>
            <div class="col-span-12 my-4 border-b"></div>
            <div class="col-span-8 text-lg font-medium" contenteditable>Extended security updates for a year</div>
            <div class="self-center text-right" contenteditable>$15.000</div>
            <div class="self-center text-right" contenteditable>2</div>
            <div class="col-span-2 self-center text-right" contenteditable>$30,000.00</div>
            <div class="col-span-12 my-4 border-b"></div>
            <div class="col-span-8 text-lg font-medium" contenteditable>Extended updates for a year</div>
            <div class="self-center text-right" contenteditable>$50.000</div>
            <div class="self-center text-right" contenteditable>2</div>
            <div class="col-span-2 self-center text-right" contenteditable>$100,000.00</div>
            <div class="col-span-12 mt-16"></div>
            <div class="col-span-10 self-center font-medium tracking-tight text-secondary">SUBTOTAL</div>
            <div class="col-span-2 text-right text-lg" contenteditable>$227,315.00</div>
            <div class="col-span-12 my-3 border-b"></div>
            <div class="col-span-10 self-center font-medium tracking-tight text-secondary">TAX</div>
            <div class="col-span-2 text-right text-lg" contenteditable>$11,365.75</div>
            <div class="col-span-12 my-3 border-b"></div>
            <div class="col-span-10 self-center font-medium tracking-tight text-secondary">DISCOUNT</div>
            <div class="col-span-2 text-right text-lg" contenteditable>$3,680.75</div>
            <div class="col-span-12 my-3 border-b"></div>
            <div class="col-span-10 self-center text-2xl font-medium tracking-tight text-secondary">TOTAL</div>
            <div class="col-span-2 text-right text-2xl font-medium" contenteditable>$235,000.00</div>
        </div>
    </div>
</section>

<style lang="scss">
  @media print {
    section {
      padding: 0;
      transform: scale(1.15);
      margin-top: -2rem;
      margin-left: 1rem;
    }
  }

  section {
    padding: 2.5rem;
    text-align: left;
    color: rgb(30, 41, 59);
  }

  .grid .border-b {
    border-bottom: 1px solid rgba(var(--fuse-border-rgb), 1);
  }

  .container {
    margin: 0 auto;
    padding: 4rem;
    border-radius: 1rem;
    width: 60rem;
    background: #fff;

    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      > div:first-of-type {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        column-gap: 1rem;
        row-gap: 0.25rem;
        font-size: 0.9rem !important;

        .font-medium {
          margin-top: 0.25rem;
        }
      }

      > div:last-of-type {
        color: white;
        margin-right: -4rem !important;
        display: grid !important;
        grid-auto-columns: max-content !important;
        grid-auto-flow: column !important;
        column-gap: 2rem !important;
        border-top-left-radius: 1rem !important;
        border-bottom-left-radius: 1rem !important;
        background-color: rgba(var(--fuse-accent-rgb), 1) !important;
        padding: 1.5rem 2rem !important;
        font-size: .8125rem !important;

        .info {
          padding-left: 2.5rem;
          border-left: 1px solid rgba(var(--fuse-border-rgb), 0.2);

          div {
            margin-top: 0.25rem;
          }
        }
      }
    }
  }

  .tracking-tight {
    letter-spacing: -.025em !important;
  }

  .text-4xl {
    font-size: 2rem !important;
  }

  .text-secondary {
    --tw-text-opacity: 1 !important;
    color: rgba(var(--fuse-text-secondary-rgb), var(--tw-text-opacity)) !important;
  }

  .font-medium {
    font-weight: 500 !important;
  }

  .w-24 {
    width: 6rem;
  }

  .text-md {
    font-size: .8125rem !important;
  }

  .text-xl {
    font-size: 1.125rem !important;
  }

  .gap-2 {
    div {
      margin-bottom: 0.25rem;
    }
  }

  .gap-x-1 {
    column-gap: 0.25rem !important;
  }

  .grid-cols-12 {
    grid-template-columns: repeat(12, minmax(0, 1fr)) !important;
  }

  .grid {
    display: grid !important;
  }

  .mt-12 {
    margin-top: 3rem !important;
  }

  .col-span-8 {
    grid-column: span 8 / span 8 !important;
  }

  .text-right {
    text-align: right !important;
  }

  .col-span-2 {
    grid-column: span 2 / span 2 !important;
  }

  .border-b {
    border-bottom-width: 1px !important;
  }

  .my-4 {
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
  }

  .col-span-12 {
    grid-column: span 12 / span 12 !important;
  }

  .text-lg {
    font-size: 1rem !important;
  }

  .mt-16 {
    margin-top: 4rem !important;
  }

  .self-center {
    align-self: center !important;
  }

  .col-span-10 {
    grid-column: span 10 / span 10 !important;
  }

  .my-3 {
    margin-top: 0.75rem !important;
    margin-bottom: 0.75rem !important;
  }

</style>
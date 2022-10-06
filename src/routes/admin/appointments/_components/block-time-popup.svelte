<script>
    import Popup from "$lib/popup.svelte";
    import Button from "$lib/forms/button.svelte";
    import Form from "$lib/forms/form.svelte";
    import Select from "$lib/forms/select.svelte";
    import InputField from "$lib/forms/input-field.svelte";
    import {TimeHelper} from "../../../../utils/TimeHelper.js";
    import {ApiProgressBar} from "../../../../utils/ApiProgressBar.js";
    import {FirebaseClient} from "../../../../utils/firebase/FirebaseClient.js";
    import {settings} from "../../../../lib/stores.js";
    import {showToast} from "../../../../utils/logger.js";

    export let staff, date, fetchStaff, staffAccounts, visible, onClose;

    // get an array of slider time values from 4am to 8pm
    let timeMap = [];
    for (let hour = 4; hour <= 20; hour += 0.5) timeMap.push(TimeHelper.sliderValTo24(hour));

    let submitBtn;
    let closing = false;
    let submitted = false;
    let form_errors = {};
    let formValues = {};

    let blockEntireDay = true;

    $: disabled = !blockEntireDay && (!formValues["start"] || !formValues["end"]);

    function close() {
        if (closing) return;

        closing = true;
        setTimeout(() => {
            visible = false;
        }, 400);
    }

    async function onSubmit(formData) {
        ApiProgressBar.start();
        try {
            await FirebaseClient.add("blocked_time", {
               staff: staff.doc_id,
               date,
               ...(formData["reason"] && { reason: formData["reason"] }),
               ...(formData["start"] && { start: formData["start"] }),
               ...(formData["end"] && { end: formData["end"] })
            });
            close();
        } catch (error) {
            showToast();
            console.error(error);
        }
        ApiProgressBar.stop();
    }
</script>

<Popup {onClose} bind:visible={visible} bind:closing={closing} title="Block Time">
    <div slot="content" class="app">
        <Form bind:formValues={formValues} onSubmit={onSubmit} hideFooter style="width: 100%;margin-top: 1rem;"
              onChange={(e) => {
            delete form_errors[e.target.name];
            form_errors = form_errors;
        }}>
            <div class="form-container">
                <div class="allDay">
                    <InputField name="allDay" id="allDay" type="toggle" label="Block off entire day"
                                bind:value={blockEntireDay}/>
                </div>

                <div class="time-slots">
                    <Select disabled={blockEntireDay} name={`start`} bind:form_errors={form_errors}
                            placeholder="Day start" small infoTop="Start time">
                        {#each timeMap as timestamp (timestamp)}
                            <option value={timestamp}>{TimeHelper.convertTime24to12(timestamp)}</option>
                        {/each}
                    </Select>
                    <span>-</span>
                    <Select disabled={blockEntireDay} name={`end`} bind:form_errors={form_errors}
                            placeholder="Day start" small infoTop="End time">
                        {#each timeMap as timestamp (timestamp)}
                            <option value={timestamp}>{TimeHelper.convertTime24to12(timestamp)}</option>
                        {/each}
                    </Select>
                </div>
            </div>

            <div style="display: flex;margin-top: 2rem;">
                <InputField type="text" name="reason" placeholder="Reason..." />
            </div>

            <button bind:this={submitBtn} type="submit" style="display: none;"></button>
        </Form>

    </div>

    <svelte:fragment slot="footer">
        <div style="color: var(--secondary-color);font-weight: 500;">
         <span>{date.toLocaleDateString('en-US', {
             weekday: 'long',
             month: 'long',
             day: 'numeric',
             ...($settings.get("address.timezone") && { timeZone: $settings.get("address.timezone") })
         })} </span>
        </div>
        <div>
            <Button type="button" loading={submitted} callback={() => submitBtn.click()} bind:disabled={disabled}>Submit
            </Button>
        </div>
    </svelte:fragment>
</Popup>

<style lang="scss">
  .app {
    display: flex;
    align-items: flex-start;

    > div {
      flex: 1;
    }
  }


  .form-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: flex-start;
  }

  .time-slots {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    > span {
      margin-top: 0.75rem;
    }
  }

  .time-slots, .allDay {
    flex: 1;
  }
</style>
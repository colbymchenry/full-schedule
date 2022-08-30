import {CalendarStyle} from "@beyonk/svelte-datepicker/src/main.js";

export class CalendarStyles {

    static appointments() {
        let style = new CalendarStyle();
        style.dayHighlightedBackgroundColor = '#6366ea';
        style.dayHighlightedTextColor = 'white';
        style.passiveHighlightColor = '#6366ea';
        style.highlightColor = '#3730a3';
        style.buttonTextColor = 'white';
        style.buttonBackgroundColor = '#0f1729';
        style.buttonBorderColor = 'var(--primary-border-color)';
        style.contentBackground = '#0f1729';
        style.dayTextColor = 'var(--icon-gray)';
        style.dayTextColorIsNight = 'var(--icon-gray)';
        style.monthYearTextColor = 'var(--icon-gray)';
        style.legendTextColor = 'var(--secondary-color)';
        style.timeConfirmButtonColor = 'var(--primary-color)';
        style.currentDayTextColor = 'var(--secondary-color)';
        style.buttonWidth = '8rem;'
        return style;
    }

}
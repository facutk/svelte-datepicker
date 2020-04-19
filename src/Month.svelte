<script>
  export let year;
  export let month;
  export let range;
  export let onDayClick = () => {};

  import dayjs from 'dayjs';
  import isBetween from 'dayjs/plugin/isBetween';
  dayjs.extend(isBetween);

  import Day from './Day.svelte';
  import { dayNames } from './constants';
  import createMonthMatrix from './util/createMonthMatrix';

  const handleDayClick = (day) => {
    onDayClick(`${year}-${month}-${day}`)
  }

  const getHighlightedDays = (year, month, range) => {
    const highlightedDays = {};

    if (range.length === 2) {
      for (let day = 1; day <= 31; day += 1) {        
        highlightedDays[day] = dayjs(`${year}-${month}-${day}`)
          .isBetween(range[0], range[1], null, '[]');
      }
    }

    return highlightedDays;
  }

  $: weeks = createMonthMatrix(year, month);
  $: highlightedDays = getHighlightedDays(year, month, range);
</script>

<main>
  <header>
    {dayjs(`${year}-${month}`).format('MMMM YYYY')}
  </header>

  <table>
    <tr>
      {#each dayNames as dayName}
        <Day display={dayName} disabled />
      {/each}
    </tr>

    {#each weeks as weekDays}
      <tr>
        {#each weekDays as day}
          <Day
            display={day}
            disabled={!day}
            onClick={handleDayClick}
            highlighted="{highlightedDays[day]}"
          />
        {/each}
      </tr>
    {/each}
  </table>
</main>

<style>
  header {
    font-size: 0.9em;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  @media (max-width: 600px) {
    main {
      margin: 0 auto;
    }
  }
</style>
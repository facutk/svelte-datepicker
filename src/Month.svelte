<script>
  export let offset = 0;
  export let length = 0;
  import Day from './Day.svelte';
  import { dayNames } from './constants';
  import createMonthMatrix from './util/createMonthMatrix';

  $: weeks = createMonthMatrix(offset, length);
</script>

<div>
  <table>
    <tr>
      {#each dayNames as dayName}
        <Day display={dayName} disabled />
      {/each}
    </tr>

    {#each weeks as weekDays}
      <tr>
        {#each weekDays as day}
          <Day display={day} disabled={!day} />
        {/each}
      </tr>
    {/each}
  </table>
</div>

<style>
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
</style>
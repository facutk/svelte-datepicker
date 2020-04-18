<script>
  import Month from './Month.svelte';

  import dayjs from 'dayjs';
  import 'dayjs/locale/es';
  dayjs.locale('es')
  
  let date = dayjs();

  function handlePrevMonth() {
    date = date.add(-1,'month');
  }

  function handleNextMonth() {
    date = date.add(1,'month');
  }

  $: firstOfMonth = dayjs(dayjs(date).format('YYYY-MM'));
  $: offsetDays = firstOfMonth.get('day');
  $: daysInMonth = dayjs(date).daysInMonth();
</script>

<main>
  <p>
    <button on:click={handlePrevMonth}>←</button>
    {dayjs(date).format('MMMM YYYY')}
    <button on:click={handleNextMonth}>→</button>
  </p>

  <Month offset={offsetDays} length={daysInMonth} />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
</style>
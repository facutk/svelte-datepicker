<script>
  import Month from './Month.svelte';

  import dayjs from 'dayjs';
  import 'dayjs/locale/es';
  dayjs.locale('es')
  
  let date = dayjs();
  let range = [];
  let count = 0;

  function handlePrevMonth() {
    date = date.add(-1,'month');
  }

  function handleNextMonth() {
    date = date.add(1,'month');
  }

  const handleKeyDown = (event) => {
  	if (event.key === 'ArrowLeft') {
			handlePrevMonth();
    }
  	if (event.key === 'ArrowRight') {
			handleNextMonth();
		}
  }

  const handleDayClick = (day) => {
    range[count] = day;
    count = (count + 1) % 2;
  }

  const getYearMonthFromDate = (date, offset = 0) => {
    const dayjsDate = dayjs(date).add(offset,'month');

    return {
      year: dayjsDate.year(),
      month: dayjsDate.month() + 1 // months are 0 based
    }
  }

  $: currentMonth = getYearMonthFromDate(date);
  $: nextMonth = getYearMonthFromDate(date, 1);
</script>

<svelte:window on:keydown="{handleKeyDown}" />
<main>
  <header>
    <button on:click={handlePrevMonth}>
      <svg viewBox="0 0 1000 1000">
        <path d="M336.2 274.5l-210.1 210h805.4c13 0 23 10 23 23s-10 23-23 23H126.1l210.1 210.1c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7l-249.1-249c-11-11-11-21 0-32l249.1-249.1c21-21.1 53 10.9 32 32z"></path>
      </svg>
    </button>
    <button on:click={handleNextMonth}>
      <svg viewBox="0 0 1000 1000">
        <path d="M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z"></path>
      </svg>
    </button>
  </header>

  <section>
    <Month
      year="{currentMonth.year}"
      month="{currentMonth.month}"
      onDayClick={handleDayClick}
      range="{range}"
    />

    <Month
      year="{nextMonth.year}"
      month="{nextMonth.month}"
      onDayClick={handleDayClick}
      range="{range}"
    />
  </section>
</main>

<pre>
  {JSON.stringify(range, undefined, 2)}
</pre>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    max-width: 570px;
  }

  button {
    outline: none;
    color: transparent;
    background-color: transparent;
    border: 1px solid #e4e7e7;
    border-radius: unset;
    padding: 0 0.5em;
    height: 37px;
    width: 37px;
  }

  header {
    display: flex;
    justify-content: space-between;
  }

  section {
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 600px) {
    section {
      flex-direction: column;
    }
  }
</style>
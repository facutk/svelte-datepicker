<script>
  export let display = '';
  export let disabled = false;

  let count = 0;
  $: active = count % 2;

  function handleClick() {
    if (disabled) return;
    count += 1;
  }
</script>

<td on:click={handleClick} class:active class:disabled>
  {display || ''}
</td>

<style>
  td {
    box-sizing: content-box;
    text-align: center;
    font-size: 12px;
    padding: 11px;
    line-height: 10px;
    width: 12px;
    height: 12px;
    border: 1px solid #e4e7e7;
    cursor: pointer;
    user-select: none;
    color: #575757;
  }

  td:hover {
    background-color: #e4e7e7;
  }

  .active {
    background-color: #276ef1;
    color: white;
  }

  .active:hover {
    background-color: #276ef1;
  }

  .disabled {
    cursor: auto;
    border: none;
  }

  .disabled:hover {
    background-color: initial;
  }
</style>
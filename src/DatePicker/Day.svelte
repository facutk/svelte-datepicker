<script>
  export let display = '';
  export let disabled = false;
  export let highlighted = false;
  export let onClick = () => {};

  const handleClick = () => {
    if (disabled) return;

    onClick(display);
  }
</script>

<td
  on:click={handleClick}
  class:disabled class:highlighted
>
  {display || ''}
</td>

<style>
  td {
    box-sizing: content-box;
    text-align: center;
    font-size: 14px;
    padding: 10px;
    line-height: 14px;
    width: 12px;
    height: 16px;
    border: 1px solid #e4e7e7;
    cursor: pointer;
    user-select: none;
    color: #575757;
  }

  .disabled {
    cursor: auto;
    border: none;
    color: #ccc;
  }

  .highlighted {
    background-color: #276ef1;
    color: white;
  }
</style>
<script>
  const regExpEscape = (s) => {
    return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
  };

  export let input = undefined;
  export let list = undefined;

  export let name = '';
  export let value = '';
  export let placeholder = '';
  export let required = false;
  export let disabled = false;

  // autocomplete props
  export let options = [];
  export let isOpen = false;
  export let results = [];
  export let search = '';
  export let isLoading = false;
  export let arrowCounter = 0;

  // options
  export let loadOptions = null;
  export let minChar = 2;
  export let maxItems = 10;
  export let fromStart = true; // Default type ahea;

  const handleFocus = () => {
    isOpen = true;
  }

  const handleBlur = () => {
    isOpen = false;
  }

  const onChange = async (event) => {
    // Is the data given by an outside ajax request?
    if (loadOptions) {
      isLoading = true;
      options = await loadOptions(search);
      isLoading = false;
      filterResults();
      isOpen = true;
    } else if (search.length >= Number(minChar)) {
      filterResults();
      isOpen = true;
    }
  };

  const filterResults = () => {
    const filteredResults = options
      .filter(item => {
        if (typeof item !== 'string') {
          item = item.key || '' // Silent fail
        }
        return fromStart ? item.toUpperCase().startsWith(search.toUpperCase())
                          : item.toUpperCase().includes(search.toUpperCase())
      })
      .map(item => {
        const text = typeof item !== 'string' ? item.key : item
        return {
          key: text,
          value: item.value || item,
          label: search.trim() === '' ? text : text.replace(RegExp(regExpEscape(search.trim()), 'i'), "<span>$&</span>")
        }
      });

    results = filteredResults;

    const height = results.length > maxItems ? maxItems : results.length
    // list.style.height = `${height * 2.25}rem`
  };

  const onKeyDown = (event) => {
    event.stopPropagation();

    if (event.keyCode === 40 && arrowCounter < (results.length - 1)) {
      // ArrowDown
      arrowCounter = arrowCounter + 1;

    } else if (event.keyCode === 38 && arrowCounter > 0) {
      arrowCounter = arrowCounter - 1;
    } else if (event.keyCode === 13) {
      // Enter
      event.preventDefault();
      if (arrowCounter === -1) {
        arrowCounter = 0; // Default select first item of list
      }
      close(arrowCounter)
    } else if (event.keyCode === 27) {
      // Escape
      event.preventDefault();
      close();
    }
  };

  const close = (index = -1) => {
    isOpen = false;
    arrowCounter = -1;
    input.blur();

    if (index > -1) {
      search = results[index].key;
      value = results[index].value;
    //   this.fire('change', value)
    } else if (!value) {
      search = '';
    }
  };
</script>

<svelte:window on:click={close} />
<div on:click="{(e) => e.stopPropagation()}" class="autocomplete">
  <input
    type="text"
    {name}
    {placeholder}
    {required}
    {disabled}
    autocomplete="{name}"
    bind:value="{search}"
    on:input="{onChange}"
    on:keydown="{onKeyDown}"
    on:focus={handleFocus}
    bind:this={input}
  />

  <ul
    class="autocomplete-results {!isOpen ? ' hide-results' : ''}"
    bind:this={list}
  >
    {#if isLoading}
      <slot>
        <p class="fallback">Loading data...</p>
      </slot>
    {/if}

    {#each results as result, i}
      <li on:click="{() => close(i)}" class="autocomplete-result{ i === arrowCounter ? ' is-active' : '' }">
        {@html result.label}
      </li>
    {/each}

    {#if !isLoading && search.length && results.length === 0}
      No Results!
    {/if}

    {#if !isLoading && search.length === 0}
      Search here!
    {/if}
  </ul>
</div>

<style>
  * {
    box-sizing: border-box;
  }

  input {
    height: 2rem;
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
  }

  .autocomplete {
    display: inline-block;
    position: relative;
  }

  .hide-results {
    display: none;
  }

  .autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #dbdbdb;
    height: 6rem;
    overflow: auto;
    width: 100%;

    background-color: white;
    box-shadow: 2px 2px 24px rgba(0, 0, 0, 0.1);
    position: absolute;
    z-index: 100;
  }

  .autocomplete-result {
    color: #7a7a7a;
    list-style: none;
    text-align: left;
    height: 2rem;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
  }

  .autocomplete-result > :global(span) {
    background-color: none;
    color: #242424;
    font-weight: bold;
  }

  .autocomplete-result.is-active,
  .autocomplete-result:hover {
    background-color: #dbdbdb;
  }
</style>
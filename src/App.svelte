<script>
  import DatePicker from './DatePicker';
  import AutoComplete from './AutoComplete';

  const fruits = ["Açaí", "Akee", "Apple", "Apricot", "Avocado", "Banana", "Bilberry", "Black sapote", "Blackberry", "Blackcurrant", "Blood orange", "Blueberry", "Boysenberry", "Buddha‘s hand (fingered citron)", "Cantaloupe", "Cherimoya", "Cherry", "Chico fruit", "Clementine", "Cloudberry", "Coconut", "Crab apples", "Cranberry", "Cucumber", "Currant", "Custard apple", "Damson", "Date", "Dragonfruit (or Pitaya)", "Durian", "Elderberry", "Feijoa", "Fig", "Goji berry", "Gooseberry", "Grape", "Grapefruit", "Guava", "Honeyberry", "Honeydew", "Huckleberry", "Jabuticaba", "Jackfruit", "Jambul", "Japanese plum", "Jostaberry", "Jujube", "Juniper berry", "Kiwano (horned melon)", "Kiwifruit", "Kumquat", "Lemon", "Lime", "Longan", "Loquat", "Lychee", "Mandarine", "Mango", "Mangosteen", "Marionberry", "Melon", "Miracle fruit", "Mulberry", "Nance", "Nectarine", "Olive", "Orange", "Papaya", "Passionfruit", "Peach", "Pear", "Persimmon", "Pineapple", "Pineberry", "Plantain", "Plum", "Plumcot (or Pluot)", "Pomegranate", "Pomelo", "Prune (dried plum)", "Purple mangosteen", "Quince", "Raisin", "Rambutan", "Raspberry", "Redcurrant", "Salak", "Salal berry", "Salmonberry", "Satsuma", "Soursop", "Star apple", "Star fruit", "Strawberry", "Surinam cherry", "Tamarillo", "Tamarind", "Tangerine", "Ugli fruit", "Watermelon", "Yuzu"];
  // items={fruits}

  const asyncData = async (filter) => {
    const response = await fetch('https://restcountries.eu/rest/v2/all?fields=name;alpha3Code');
    const json = await response.json();

    return json.map(item => {
      const { name, alpha3Code } = item;

      return {
        key: name,
        value: alpha3Code
      }
    });
  }
</script>

<AutoComplete
  loadOptions={asyncData}
/>
<DatePicker />
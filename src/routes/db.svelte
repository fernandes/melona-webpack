<script>
  import { observe } from 'svelte-observable'; 
  import postsPromise from '../db';
  import { Observable } from 'rxjs';

  // You can create returning a RX Observable to svelte observable
  // const results = query();
  // // console.log('results', results)

  // const postsStore = observe(results);
  // // console.log('postsStore', postsStore)

  // function query() {
  //   return new Observable(observer => {
  //     postsPromise.then((ret) => {
  //       observer.next(ret)
  //       observer.complete()
  //     })
  //   })
  // }

  // Or passing the promise directly
  const postsStore = observe(postsPromise);
</script>

<svelte:head>
	<title>Sapper DB</title>
</svelte:head>

<h1>DB!</h1>

{#await $postsStore}
  Loading until first value
{:then posts}
  Will be re-rendered as values come in

  {#each posts as post}
    <p>{post.title} (#{post.id})</p>
  {/each}

{:catch error}
  Errors are handled too {error}
{/await}

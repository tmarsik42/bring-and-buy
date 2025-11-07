<script lang="ts">
	const { data } = $props();
</script>

<h1>{data.user.contact_email}'s Products</h1>

{#if data.products.length > 0}
	<ul>
		{#each data.products as p (p.id)}
			<li>
				<strong>{p.name}</strong> ({p.category})
				{#if p.defects}
					- Notes: {p.defects}{/if}
			</li>
		{/each}
	</ul>
{:else}
	<p>No products registered yet.</p>
{/if}

<script lang="ts">
    import type { PageData } from './$types';

    type ProductRow = {
        product: string;
        category: string;
        defects: string | null;
    };

    const { data } = $props<{ data: PageData }>();
    const grouped = $derived(data.grouped as Record<string, ProductRow[]>);
    const groupedEntries = $derived(Object.entries(grouped ?? {}));

    let openEmail: string | null = $state(null);

    function generateEmail(email: string, products: ProductRow[]) {
        const userId = products[0]?.user_id;
        const profileLink = `${window.location.origin}/profile/${userId}`;
        const subject = `Your products on our platform`;

        let body = `Hello ${email},\n\nYou can view your products here:\n${profileLink}\n\n`;
        for (const p of products) {
            body += `- ${p.product} (${p.category})`;
            if (p.defects) body += `, Notes: ${p.defects}`;
            body += '\n';
        }
        body += `\nThank you!`;
        return { subject, body };
    }

    function toggleEmail(email: string) {
        openEmail = openEmail === email ? null : email;
    }

    async function copyToClipboard(text: string) {
        try {
            await navigator.clipboard.writeText(text);
            alert('Copied to clipboard!');
        } catch (e) {
            console.error('Clipboard copy failed', e);
        }
    }
</script>

<h1>Overview</h1>

{#if data.loggedIn}
    {#each groupedEntries as [email, products]}
        <section>
            <div style="display: flex; justify-content: space-between; align-items:center;">
                <a href={`/profile/${products[0]?.user_id}`} target="_blank" class="profile-link">
                    <h2>{email}</h2>
                </a>
                <button type="button" onclick={() => toggleEmail(email)}>Send Mail</button>
            </div>

            {#if openEmail === email}
            {@const mail = generateEmail(email, products)}
                <div class="email-template">
                    <label>
                        Subject:
                        <input type="text" readonly value={mail.subject} aria-label="Email subject">
                        <button type="button" onclick={() => copyToClipboard(mail.subject)}>Copy</button>
                    </label>

                    <label>
                        Body:
                        <textarea readonly rows="8" aria-label="Email body">{mail.body}</textarea>
                        <button type="button" onclick={() => copyToClipboard(mail.body)}>Copy</button>
                    </label>
                </div>
            {/if}

            {#if products?.length > 0}
                <table>
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Notes / Defects</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each products as p}
                        <tr>
                            <td>{p.product}</td>
                            <td>{p.category}</td>
                            <td>{p.defects}</td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            {:else}
                <p>No products yet.</p>
            {/if}
        </section>
    {/each}
{:else}
    <form method="post" style="max-width: 360px; display: grid; gap: .5rem;">
        <label>
            Admin password
            <input name="password" type="password" autocomplete="current-password" required />
        </label>
        <button type="submit">Log in</button>
    </form>
{/if}

<style>
    .email-template {
        background: #fdf0ff;
        border: 2px dashed #e5b4e6;
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }

    .email-template input,
    .email-template textarea {
        width: 100%;
        border-radius: 10px;
        border: 1px solid #f4dcf4;
        padding: 0.5rem;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        font-size: 1rem;
        background: #fffafc;
    }

    .email-template button {
        align-self: flex-start;
        margin-top: 0.3rem;
        padding: 0.3rem 0.8rem;
        border-radius: 10px;
        border: none;
        background: #e5b4e6;
        color: #fff;
        cursor: pointer;
    }

    .email-template button:hover {
        background: #f4dcf4;
    }

    section table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 0.5rem;
    }

    section th, section td {
        border: 1px solid #f4dcf4;
        padding: 0.5rem 1rem;
        text-align: left;
    }

    section th {
        background: #e5b4e6;
        color: #fff;
    }

    section tr:nth-child(even) {
        background: rgba(229, 180, 230, 0.2);
    }

    section {
        margin-bottom: 2rem;
        padding: 1rem;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.3);
    }
</style>

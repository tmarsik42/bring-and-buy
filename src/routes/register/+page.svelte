<script>
    const { form } = $props();
</script>

<h1>Registration</h1>
<form method="POST">
    <label>
        Email*
        <input name="email" type="email" required>
    </label>

    <label>
        Phone (optional)
        <input name="phone" type="tel">
    </label>

    <label>
        Product name*
        <input name="productName" required>
    </label>

    <label>
        Category*
        <select name="category" required>
            <option value="clothing">Clothing</option>
            <option value="accessories">Accessories</option>
        </select>
    </label>

    <label>
        Visible defects / notes
        <textarea name="defects"></textarea>
    </label>

    {#if form?.error}
        <p style="color:red">{form.error}</p>
    {/if}

    {#if form?.success}
        <p style="color:green">Product registered successfully!</p>
    {/if}

    <button type="submit">Submit</button>
</form>

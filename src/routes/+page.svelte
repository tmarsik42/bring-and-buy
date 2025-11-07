<script lang="ts">
    let agree = $state(false);
</script>

<h1>Bring & Buy</h1>

<section id="rules">
    <h2>Bring & Buy – Rules</h2>

    <h3>1. What can be submitted</h3>
    <ul>
        <li>Clothing and accessories only (no weapons, food, liquids, or illegal items).</li>
        <li>Items must be clean and in sellable condition.</li>
        <li>Only original products or clearly marked fan-made items.</li>
        <li>No counterfeits or items violating copyright.</li>
    </ul>

    <h3>2. Registration of items</h3>
    <ul>
        <li>Each item must be registered through the official registration form.</li>
        <li>One form = one item.</li>
        <li>You must provide a valid email address for identification.</li>
        <li>The description must include all visible defects or damage.</li>
        <li>The organizer may reject items that do not meet the quality rules.</li>
    </ul>

    <h3>3. Limits</h3>
    <ul>
        <li>Clothing category has a limited capacity. Once the limit is reached, no more clothing items will be accepted.</li>
        <li>Each visitor may register only a reasonable amount of items to keep the table fair and manageable. Organizers may refuse excessive submissions.</li>
    </ul>

    <h3>4. Pricing</h3>
    <ul>
        <li>You set the price of your items.</li>
        <li>Prices should be final and visible.</li>
        <li>No bargaining at the Bring & Buy table (buyers must pay the listed price).</li>
    </ul>

    <h3>5. Responsibility</h3>
    <ul>
        <li>The organizer is <strong>not responsible</strong> for:
            <ul>
                <li>loss or theft of items,</li>
                <li>damage caused by handling or visitors,</li>
                <li>items not sold by the end of the event.</li>
            </ul>
        </li>
        <li>You submit items at your own risk.</li>
    </ul>

    <h3>6. Selling process</h3>
    <ul>
        <li>Items are sold by the staff only.</li>
        <li>Buyers pay at the checkout; items are released only upon payment.</li>
        <li>Items cannot be reserved.</li>
    </ul>

    <h3>7. Collection of unsold items</h3>
    <ul>
        <li>Unsold items must be collected before the end of the event at the designated time.</li>
        <li>Items not collected in time become <em>abandoned</em> and may be donated or disposed of.</li>
    </ul>

    <h3>8. Payments to sellers</h3>
    <ul>
        <li>You will receive payment for sold items according to the event rules (usually at the end of the event).</li>
    </ul>
</section>

<section id="privacy">
    <h2>Privacy & Data Handling</h2>

    <p>We take your privacy seriously. By submitting your information through the registration form, you agree to the collection and processing of your personal data as described below.</p>

    <h3>1. Personal Data Collected</h3>
    <ul>
        <li>Email address (required) – used to identify the seller and communicate regarding your items.</li>
        <li>Phone number (optional) – used only for contacting you about your registered items if necessary.</li>
    </ul>

    <h3>2. Purpose of Data Processing</h3>
    <ul>
        <li>To register and manage items you bring for sale.</li>
        <li>To contact you in case of questions or issues related to your items.</li>
        <li>To ensure the event runs smoothly and in accordance with Bring & Buy rules.</li>
    </ul>

    <h3>3. Legal Basis</h3>
    <p>Your data is processed based on your consent when you submit the registration form, in compliance with GDPR (General Data Protection Regulation).</p>

    <h3>4. Data Retention</h3>
    <ul>
        <li>Your personal data will be kept only for as long as necessary for the purpose of managing the event.</li>
        <li>After the event, your data will be deleted or anonymized unless further legal obligations apply.</li>
    </ul>

    <h3>5. Data Sharing</h3>
    <ul>
        <li>Your personal information will not be shared with third parties except for event organizers or staff directly managing the Bring & Buy process.</li>
        <li>Data will never be sold or used for marketing purposes without your explicit consent.</li>
    </ul>

    <h3>6. Your Rights</h3>
    <ul>
        <li>You have the right to request access to your personal data.</li>
        <li>You can request correction or deletion of your data at any time.</li>
        <li>You may withdraw your consent at any time, which will stop further processing of your personal data.</li>
    </ul>

    <h3>7. Security</h3>
    <p>We implement reasonable technical and organizational measures to protect your personal data from unauthorized access, disclosure, or loss.</p>

    <p>If you have any questions about how your data is handled, please contact the event organizer at <a href="mailto:contact@example.com">contact@example.com</a>.</p>
</section>

<div class="center">
    <input type="checkbox" id="agree" bind:checked={agree} />
    <label for="agree">I agree to the terms and conditions</label>
</div>

<div class="center">
    <a
        href="/register"
        class="next-link"
        class:disabled={!agree}
    >
        Next
    </a>
</div>

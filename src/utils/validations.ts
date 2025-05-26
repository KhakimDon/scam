export const validatePhoneNumber = (value: string) => {
    const regex =
        /^\+998([- ])?(90|91|93|94|95|98|99|88|33|97|71|77|78|70)([- ])?(\d{3})([- ])?(\d{2})([- ])?(\d{2})$/;

    return regex.test(value);
};

export function isValidSlug(slug: string) {
    // Define a regular expression for a valid slug
    const slugRegex = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;

    // Test the input slug against the regular expression
    return slugRegex.test(slug);
}


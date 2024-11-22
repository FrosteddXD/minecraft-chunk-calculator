document.getElementById("chunkForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get user input values
    const xCoordInput = document.getElementById("xCoord").value;
    const yCoordInput = document.getElementById("yCoord").value;
    const zCoordInput = document.getElementById("zCoord").value;

    // Check for invalid characters (anything other than numbers and negative sign)
    if (!/^-?\d+$/.test(xCoordInput) || !/^-?\d+$/.test(yCoordInput) || !/^-?\d+$/.test(zCoordInput)) {
        // Show alert if input contains invalid characters
        alert("Please enter valid coordinates (numbers including negative values only).");

        // Reset the form inputs
        document.getElementById("xCoord").value = '';
        document.getElementById("yCoord").value = '';
        document.getElementById("zCoord").value = '';

        // Reset the output area (prevent showing results)
        document.getElementById("northX").value = '';
        document.getElementById("northZ").value = '';
        document.getElementById("southX").value = '';
        document.getElementById("southZ").value = '';
        document.getElementById("westX").value = '';
        document.getElementById("westZ").value = '';
        document.getElementById("eastX").value = '';
        document.getElementById("eastZ").value = '';
        document.getElementById("centerX").value = '';
        document.getElementById("centerZ").value = '';
        document.getElementById("command").value = '';

        return;
    }

    // Parse the coordinates after validation
    const xCoord = parseInt(xCoordInput);
    const yCoord = parseInt(yCoordInput);
    const zCoord = parseInt(zCoordInput);

    // Calculate chunk coordinates
    const chunkX = Math.floor(xCoord / 16);
    const chunkZ = Math.floor(zCoord / 16);

    // Calculate chunk borders
    const startX = chunkX * 16;
    const endX = startX + 15;
    const startZ = chunkZ * 16;
    const endZ = startZ + 15;

    // Calculate center of the chunk
    const centerX = startX + 8;
    const centerZ = startZ + 8;

    // Update table values
    document.getElementById("northX").value = startX;
    document.getElementById("northZ").value = startZ;

    document.getElementById("southX").value = startX;
    document.getElementById("southZ").value = endZ;

    document.getElementById("westX").value = startX;
    document.getElementById("westZ").value = startZ;

    document.getElementById("eastX").value = endX;
    document.getElementById("eastZ").value = startZ;

    document.getElementById("centerX").value = centerX;
    document.getElementById("centerZ").value = centerZ;

    // Generate the /fill command to replace the blocks at the player's Y level with emerald blocks
    const command = `
/fill ${startX} ${yCoord} ${startZ} ${endX} ${yCoord} ${endZ} minecraft:emerald_block
`;

    // Output the command into the textarea
    document.getElementById("command").value = command;
});

// Restrict input to valid numbers or negative sign
document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('input', function (event) {
        this.value = this.value.replace(/[^-\d]/g, ''); // Allow only digits and the negative sign
    });
});
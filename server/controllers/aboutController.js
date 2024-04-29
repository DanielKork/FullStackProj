//Daniel Korkus 314629692
//Tamir Razon 207421322


exports.getAbout = (req, res) => {
    try {
        // Array containing information about developers
        const developers = [
            { firstname: "Daniel", lastname: "Korkus", id: 314629692, email: "daniel.korkus@icloud.com" },
            { firstname: "Tamir", lastname: "Razon", id: 207421322, email: "tamir.razon@gmail.com" }
        ];
        
        // Sending the developers' information as JSON response
        res.json(developers);
    } catch (error) {
        // Handling errors and sending an appropriate error response
        console.error('Error getting developers information:', error.message);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
};

const express = require('express');
const User = require('../models/User');
const router = express.Router()

// insert new user
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newUser = new User(data);
        const response = await newUser.save()
        res.status(200).json(response)
        console.log("data saved")

    }

    catch (error) {
        console.log("error while saving data", error)
    }
    
})

// grt all user
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }

    catch (error) {
        console.log("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


// get users by specific role
router.get('/:role', async (req, res) => {
    try {
        const { role } = req.params
        const validroles = ["student", 'teacher', 'admin']
        if (!validroles.includes(role)) {
            return res.status(400).json({ message: " this is invalid role " })
        }

        const users = await User.find({ role });

        if (users.length == 0) {
            return res.status(400).json({ message: " no data matched with this role " })
        }

        res.status(200).json(users)
    }

    catch (error) {
        console.log("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})



// update a record

router.put('/:id', async (req, res) => {
    try {
        const UserId = req.params.id;
        const updatedUser = req.body;

        const response = await User.findByIdAndUpdate(
            UserId,
            updatedUser,
            {
                new: true,
                runValidators: true
            }
        )

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        res.status(200).json(response)

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})




// delete 
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await User.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router
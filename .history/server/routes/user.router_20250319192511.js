// const express = require('express');
// const encryptLib = require('../modules/encryption');
// const pool = require('../modules/pool');
// const userStrategy = require('../strategies/user.strategy');


// const router = express.Router();

// // If the request came from an authenticated user, this route
// // sends back an object containing that user's information.
// // Otherwise, it sends back an empty object to indicate there
// // is not an active session.
// router.get('/', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.send(req.user);
//   } else {
//     res.send({});
//   }
// });

// // Handles the logic for creating a new user. The one extra wrinkle here is
// // that we hash the password before inserting it into the database.
// router.post('/register', (req, res, next) => {
//   const username = req.body.username;
//   const hashedPassword = encryptLib.encryptPassword(req.body.password);

//   const sqlText = `
//     INSERT INTO "user"
//       ("username", "password")
//       VALUES
//       ($1, $2);
//   `;
//   const sqlValues = [username, hashedPassword];

//   pool.query(sqlText, sqlValues)
//     .then(() => {
//       res.sendStatus(201)
//     })
//     .catch((dbErr) => {
//       console.log('POST /api/user/register error: ', dbErr);
//       res.sendStatus(500);
//     });
// });

// // Handles the logic for logging in a user. When this route receives
// // a request, it runs a middleware function that leverages the Passport
// // library to instantiate a session if the request body's username and
// // password are correct.
//   // You can find this middleware function in /server/strategies/user.strategy.js.
// router.post('/login', userStrategy.authenticate('local'), (req, res) => {
//   res.sendStatus(200);
// });

// // Clear all server session information about this user:
// router.post('/logout', (req, res, next) => {
//   // Use passport's built-in method to log out the user.
//   req.logout((err) => {
//     if (err) { 
//       return next(err); 
//     }
//     res.sendStatus(200);
//   });
// });


// module.exports = router;

const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

// ===============================
// ✅ Get User Profile
// ===============================
router.get('/', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const user = await admin.auth().getUser(decodedToken.uid);

    res.json({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      role: decodedToken.role || 'user',
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// ===============================
// ✅ Register New User
// ===============================
router.post('/register', async (req, res) => {
  const { email, password, displayName } = req.body;

  try {
    const user = await admin.auth().createUser({
      email,
      password,
      displayName,
    });

    // Set a default role for the user in custom claims
    await admin.auth().setCustomUserClaims(user.uid, { role: 'user' });

    res.status(201).json({ message: `User ${email} created successfully` });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// ===============================
// ✅ Assign Admin Role
// ===============================
router.post('/set-admin', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await admin.auth().getUserByEmail(email);

    await admin.auth().setCustomUserClaims(user.uid, { role: 'admin' });

    res.json({ message: `User ${email} has been made an admin.` });
  } catch (error) {
    console.error('Error setting admin role:', error);
    res.status(500).json({ error: 'Failed to set admin role' });
  }
});

// ===============================
// ✅ Get User Role
// ===============================
router.get('/role', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    res.json({
      role: decodedToken.role || 'user',
    });
  } catch (error) {
    console.error('Error fetching user role:', error);
    res.status(500).json({ error: 'Failed to fetch user role' });
  }
});

// ===============================
// ✅ Logout (Client-side)
// ===============================
router.post('/logout', (req, res) => {
  // Firebase handles logout on the client side
  res.json({ message: 'User logged out successfully' });
});

module.exports = router;


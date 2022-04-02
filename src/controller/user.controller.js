const express = require("express")
const User = require("../model/user.model")
const upload = require("../middleware/upload")
const router = express.Router()

//get for User

router.get("", async (req, res) => {
  try {
    const users = await User.find().lean().exec()
    return res.status(200).send(users)
  }
  catch (err) {
    return res.status(500).send({ message: err.message });
  }
})

// post for user or create for user

router.post("", upload.single("profile_pic"), async (req, res) => {
  console.log("hello")
  try {
    //   const user = await User.create(req.body)
    const user = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      profile_pic: req.file.path,
    });
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//delete


router.delete("/:id", upload.single("profile_pic"), async (req, res) => {
  console.log("hello")
  try {
    //   const user = await User.create(req.body)
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();
     
    
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//patch


router.patch("/:id", upload.single("profile_pic"), async (req, res) => {
  console.log("hello")
  try {
    //   const user = await User.create(req.body)
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{

    })
     
    .lean()
    .exec()
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


//gallery
// router.post("/multiple",upload.any("profile_pic"),
// async (req,res) =>{
//   try{
//     const filespaths = req.files.map((files) =>{
//       return files.path;
//     });
//     const user = await User.create({
//  first_name :req.body.first_name,
//  last_name : req.body.last_name,
//  profile_pic : filespaths,
//     });
//     return res.status(200).send(user);
//   }
//   catch(err)
//   {
//     return res.status(500).send({message:err.message})

//   }
// });




router.post("/multiple", upload.any("profile_pic"), async (req, res) => {
  try {
    const filePaths = req.files.map((file) => {
      console.log({ file })
      return file.path;
    });

    const user = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      profile_pic: filePaths,
    });

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router
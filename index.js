
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/my-friends');

const Friend = mongoose.model("Friend", 
    {
        name: String
    }
);

const add = async (name) => {
    const friend = new Friend({name: name});
    console.log(friend);
    await friend.save();
    process.exit();
}

const findOne = async (name) => {
    const friend = await Friend.findOne({name: name});
    console.log(friend)
    process.exit();
};

const findAll = async () => {
    const friend = await Friend.find();
    console.log(friend);
    process.exit();
};

const findSome = async (name) => {
    const friend = await Friend.find({name: name});
    console.log(friend);
    process.exit();
};

const updateOne = async (name, newName) => {
    const friend = await Friend.updateOne({name: name}, {name: newName});
    console.log(friend);
    process.exit();
};

const updateMany = async (name, newName) => {
    const friend = await Friend.updateMany({name: name}, {name: newName});
    console.log(friend)
    process.exit();
};

const deleteOne = async (name) => {
    const friend = await Friend.deleteOne({name: name});
    console.log(friend);
    process.exit();
};

const deleteMany = async (name) => {
    const friend = await Friend.deleteMany({name: name});
    console.log(friend);
    process.exit();
};

const deleteAll = async () => {
    const friend = await Friend.deleteMany();
    console.log(friend);
    process.exit();
};

const main = async (argv) => {
    
    try {
        if (argv.add) {
            await add(argv.name);
        } else if (argv.findOne) {
            await findOne(argv.name);
        } else if (argv.findAll) {
            await findAll();
        } else if (argv.findSome) {
            await findSome(argv.name)
        } else if (argv.updateOne) {
            await updateOne(argv.name, argv.newName);
        } else if (argv.updateMany) {
            await updateMany(argv.name, argv.newName);
        } else if (argv.deleteOne) {
            await deleteOne(argv.name);
        } else if (argv.deleteMany) {
            await deleteMany(argv.name);
        } else if (argv.deleteAll) {
            await deleteAll();
        }
    } catch (error) {
        console.log(error);
    }
};

main(argv);
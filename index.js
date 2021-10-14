
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
        }
    } catch (error) {
        console.log(error);
    }
};

main(argv);
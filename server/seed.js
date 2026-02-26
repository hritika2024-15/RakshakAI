const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Case = require('./models/case');

dotenv.config();

const syntheticCases = [
    // High-Risk Profile: Anil Kumar
    {
        caseNumber: "CNR-MHBO-001234-2024",
        petitionerName: "Anil Kumar",
        advocateName: "Adv. Rajesh Sharma",
        courtName: "Bombay High Court",
        caseType: "Writ Petition",
        filingDate: new Date("2024-02-15"),
        status: "Dismissed",
        vexScore: 85
    },
    {
        caseNumber: "CNR-MHBO-005671-2024",
        petitionerName: "Anil Kumar",
        advocateName: "Adv. Rajesh Sharma",
        courtName: "Bombay High Court",
        caseType: "PIL",
        filingDate: new Date("2024-02-10"),
        status: "Frivolous",
        vexScore: 90
    },
    {
        caseNumber: "CNR-DLHC-009822-2024",
        petitionerName: "Anil Kumar",
        advocateName: "Adv. Rajesh Sharma",
        courtName: "Delhi HC",
        caseType: "Defamation",
        filingDate: new Date("2024-02-05"),
        status: "Dismissed",
        vexScore: 95
    },
    {
        caseNumber: "CNR-KABC-001122-2024",
        petitionerName: "Anil Kumar",
        advocateName: "Adv. Amit Verma",
        courtName: "Karnataka HC",
        caseType: "Interim Relief",
        filingDate: new Date("2024-01-20"),
        status: "Pending",
        vexScore: 70
    },
    {
        caseNumber: "CNR-MHBO-004455-2023",
        petitionerName: "Anil Kumar",
        advocateName: "Adv. Rajesh Sharma",
        courtName: "Bombay High Court",
        caseType: "Civil suit",
        filingDate: new Date("2023-11-12"),
        status: "Dismissed",
        vexScore: 60
    },

    // Medium-Risk Profile: Suman Rawat
    {
        caseNumber: "CNR-DLHC-004321-2023",
        petitionerName: "Suman Rawat",
        advocateName: "Adv. Priya Singh",
        courtName: "Delhi HC",
        caseType: "Writ Petition",
        filingDate: new Date("2023-12-01"),
        status: "Closed",
        vexScore: 45
    },
    {
        caseNumber: "CNR-DLHC-004322-2023",
        petitionerName: "Suman Rawat",
        advocateName: "Adv. Priya Singh",
        courtName: "Delhi HC",
        caseType: "Writ Petition",
        filingDate: new Date("2023-11-15"),
        status: "Dismissed",
        vexScore: 50
    },

    // Low-Risk Profile: John Doe
    {
        caseNumber: "CNR-MHBO-009999-2023",
        petitionerName: "John Doe",
        advocateName: "Adv. Robert Smith",
        courtName: "Bombay High Court",
        caseType: "Property Dispute",
        filingDate: new Date("2023-05-10"),
        status: "Closed",
        vexScore: 10
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(" Connected to MongoDB for seeding...");

        await Case.deleteMany({});
        console.log(" Cleared existing cases.");

        await Case.insertMany(syntheticCases);
        console.log(" Seeded 8 synthetic cases with vexatious patterns.");

        process.exit();
    } catch (error) {
        console.error(" Seeding failure:", error);
        process.exit(1);
    }
};

seedDB();

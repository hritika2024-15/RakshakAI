import random
import os
from faker import Faker
from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime, timedelta

load_dotenv() 

fake = Faker('en_IN')

MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    print("Error: MONGO_URI not found!")
    exit(1)

client = MongoClient(MONGO_URI)
db = client.rakshak_db
# Clear existing for a clean intelligence seeding
db.cases.delete_many({})

JUDICIAL_REMARKS = [
    "Failed to establish cause of action; dismissed with costs.",
    "Calculated attempt to delay parallel proceedings.",
    "Vexatious filing; petitioner cautioned for abuse of process.",
    "Repetitive litigation on same facts; dismissed as frivolous.",
    "Petitioner failed to disclose prior litigation history.",
    "Standard procedure summary; ongoing review.",
    "Process analysis pending; interim relief denied.",
    "Dismissed: Lack of standing and meritless claims.",
    "Withdrawn after respondent raised preliminary objections.",
    "Strategically timed filing cluster detected."
]

def create_case(p_name, r_name, status="Ongoing", date=None, custom_remarks=None):
    if date is None:
        d = fake.date_between(start_date='-3y', end_date='today')
    else:
        d = date
    
    dt = datetime.combine(d, datetime.min.time())
    
    # Disposal date if not ongoing
    disposal_dt = None
    if status in ['Dismissed', 'Closed', 'Withdrawn', 'Frivolous']:
        disposal_dt = dt + timedelta(days=random.randint(30, 365))
        remarks = custom_remarks or random.choice(JUDICIAL_REMARKS)
    else:
        remarks = "Standard ongoing matter."

    return {
        "caseNumber": f"CNR-{fake.unique.bothify(text='????-######-####')}",
        "petitionerName": p_name,
        "respondentName": r_name,
        "advocateName": fake.name() + " (Advocate)",
        "courtName": random.choice(["Delhi High Court", "Bombay High Court", "District Court Pune", "Karnataka HC", "Madras HC"]),
        "caseType": random.choice(["PIL", "Civil", "Criminal", "Defamation", "Writ Petition", "Interim Relief"]),
        "filingDate": dt,
        "disposalDate": disposal_dt,
        "status": status,
        "costs": random.randint(5000, 100000),
        "remarks": remarks
    }

print("Injecting Advanced Intelligence Data into Atlas...")

# --- 1. THE TARGET: "SafeStreet Infra Ltd" (Targeted Harassment) ---
target_respondent = "SafeStreet Infra Ltd"
harasser_petitioner = "Ramesh Kumar Gupta"

# Cluster A: Targeted Harassment against SafeStreet
for _ in range(15):
    d = fake.date_between(start_date='-2y', end_date='today')
    db.cases.insert_one(create_case(harasser_petitioner, target_respondent, status=random.choice(["Dismissed", "Withdrawn", "Ongoing"]), date=d))

# Cluster B: Ramesh's prior harassment history (Habitual Filer profile)
# 25 more cases against 20 other different respondents
other_targets = [fake.company() for _ in range(20)]
for _ in range(25):
    res_name = random.choice(other_targets)
    db.cases.insert_one(create_case(harasser_petitioner, res_name, status=random.choice(["Dismissed", "Withdrawn", "Frivolous"])))

# --- 2. THE HABITUAL FILER: "Vijay M. Sharma" (Broad Serial Litigator) ---
habitual_filer = "Vijay M. Sharma"
# 45 cases filed against 25 different respondents
unique_respondents = [fake.company() for _ in range(25)]
for i in range(45):
    res_name = random.choice(unique_respondents)
    status = "Ongoing" if i < 5 else random.choice(["Dismissed", "Withdrawn", "Frivolous"])
    db.cases.insert_one(create_case(habitual_filer, res_name, status=status))

# --- 3. CONTROL: "Nexus Real Estate" ---
elevated_respondent = "Nexus Real Estate"
for _ in range(15):
    db.cases.insert_one(create_case(fake.name(), elevated_respondent))

# --- 4. NOISE: Random Respondents ---
for _ in range(400):
    db.cases.insert_one(create_case(fake.name(), fake.company()))

total_count = db.cases.count_documents({})
print(f"Successfully injected {total_count} cases!")
print(f"Habitual Profile 'Vijay M. Sharma' seeded with 45 cases.")
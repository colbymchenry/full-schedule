import nodemailer from "nodemailer";

const config = {
    "type": "service_account",
    "project_id": "regenmd",
    "private_key_id": "6ef1001665ba665fa0596fe21ff23779bd92c47b",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDsxSL2KZIdu6fC\n4YDRwy/CanMNPVL7eVVyopraqbQr/PVxsvFgu0MBP+kGgiOBnGSZiNU6H/V5gBAv\nCgLahKrFjv6OBk1nFld18E+upWM1bzyTjUKPSRh1wVoFDo0ol0p3aCrEfkHxFMWc\nmZ7qZzhNF62RT7ZaKnIAG9PaR/V0xff4qttdRJ7KuetHK2Om+oRXUiqKl02uiMKL\nUzDs/stlBRiVn+oJK7Af+tg9qXnDWH6ZDIocE1ySNFdbehzNKdzGmEIEiYz8Cq6q\nchTJG7/ne9eagHf3Gj6u1LDCTMHxJNfS9FcO9XIzYr3iCLqWNh3kddvsjS3hwiLx\nJMsgtlEtAgMBAAECggEABFOvSYuwRZDUsQVeova2hw6w9DtRqpIove6Qy+bcCbhs\nDTGK+GHpCJB6xAlZeBiRPL5jvysvA5MT402DMyvHfygXfiWeq9VHBeW9XwtbXnJI\n9h1XwQyXQNemuymX6iJRqbr378gAO9VNrd301IMhuURHLLz7L8ykxrG7fmVgQUuv\n4SLh3vj21OawYSZfJIlQxdLtWFob5mj+kByfaqoG7S5wlQMoTzRHY7Pg4WtMbKXx\no6tpcGocX3lqT3G4pz7MHK+2nd2lmdFkbcP4oMbwimn30ZyE4SEOP2pMO7B+66lw\n1B4yYPi6/Wbdq1FHVdFRIoS2Rz3CnVDkiSfi88akQQKBgQD2nyS/7iDgjvRJn5u3\nN4DwVGcSS9991YpcUDw2eERUiHT1PBFEcgJESgGwibnBimkRCk3h7DpgLXT1yjxv\n8zuK83gyPnNe7l5+l32L7VDYpULPbm7jhTYsNd5PjboMXtLxgKpAh+4SiSpqnOzc\nlygLN4UiVRdbTqM+RmSv7lH7nQKBgQD1xhaHVk8Ik155Jd5pw/NHGmxyrCG0zebA\nDc55yf2ZBFA02hN1a25oEET7iSX5WyCr11ZTAmpPM/yhb+OqgddfQj2i/ogCIrFW\nFm6kxV6/7K+Kph5MxY1H4V56tykO4oqCc9eyhzgd34usFD4kKBkOONYMv/45qBom\ntH4bIGGe0QKBgQCCK0d7YlXKEMoRngPTdaFBuFraxl9FDJPF27ecTGhMceXBlp3K\nkZ5uqt0vb9IyvDpuexDWgRfisbt9C+xQboJr+cvkQSAl6AzKJm1mkLDOWJPl5nTy\n89m/BgO726NqahZOz8mM2/IlqG5R7Vf7qnDBUuGbWGxGjkANW5xDW7e75QKBgQDb\n/dGQlrrrrC22NyVcep86F/bWtij9lAhmBHW7IgizfN7mUAV25xDOaTG2DU9GYkFe\nT8PfTZwnBRuuzV518v77L2nIihjoAHHH4xBqwJhNJukCLCuXAIWzv5E4Otavkiv1\nFQgPr2WVp9F32C6/Ynz68/j1NK20ojm2R31Rfqyi4QKBgQCy5zm83eeq7+zuh7WR\nhWS1UkNbYb9N2L3kh7cVnip9zn8Ttwb7o8k94BNIzt7THnLtkRketKegwRX7GERE\nlV+O1Tz94Z00IQCirybhAbw9VeEM/mn/U8Oo8fCF7fc+NG8n6VfBElylAdo8TD+W\nEow7J7MwFkS9LSx6Uf68MtuDsg==\n-----END PRIVATE KEY-----\n",
    "client_email": "emails@regenmd.iam.gserviceaccount.com",
    "client_id": "114142529265957611008",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/emails%40regenmd.iam.gserviceaccount.com"
}

let transporter;

try {
    transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'contact@regenmdwellness.com'
        }
    })
} catch (error) {

}

export class MailHelper {



    static async send(to, subject, html) {
    }

}
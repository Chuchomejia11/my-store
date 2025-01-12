-- CreateTable
CREATE TABLE "Employee" (
    "employeeNumber" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "secondLastName" TEXT NOT NULL,
    "rfc" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employeeNumber")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "employeeNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "verificationEmail" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "verificationToken" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_rfc_key" ON "Employee"("rfc");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE INDEX "Employee_email_idx" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_employeeNumber_key" ON "Session"("employeeNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Session_verificationEmail_key" ON "Session"("verificationEmail");

-- CreateIndex
CREATE INDEX "Session_verificationEmail_idx" ON "Session"("verificationEmail");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_employeeNumber_fkey" FOREIGN KEY ("employeeNumber") REFERENCES "Employee"("employeeNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "image" TEXT,
    "bookedVisits" JSONB[],
    "favoriteResidency" TEXT[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agents" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "agents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "owners" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "residencies" (
    "id" UUID NOT NULL,
    "images" TEXT[],
    "title" TEXT,
    "video" TEXT,
    "address" TEXT NOT NULL,
    "metro" TEXT,
    "district" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "commission" DOUBLE PRECISION,
    "rooms" INTEGER,
    "area" DOUBLE PRECISION,
    "type" TEXT,
    "parking" INTEGER,
    "balcony" BOOLEAN,
    "bathrooms" TEXT,
    "amenities" TEXT[],
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "agentEmail" TEXT,
    "ownerEmail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "residencies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "agents_email_key" ON "agents"("email");

-- CreateIndex
CREATE UNIQUE INDEX "owners_email_key" ON "owners"("email");

-- AddForeignKey
ALTER TABLE "residencies" ADD CONSTRAINT "residencies_agentEmail_fkey" FOREIGN KEY ("agentEmail") REFERENCES "agents"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "residencies" ADD CONSTRAINT "residencies_ownerEmail_fkey" FOREIGN KEY ("ownerEmail") REFERENCES "owners"("email") ON DELETE SET NULL ON UPDATE CASCADE;

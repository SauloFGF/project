-- CreateTable
CREATE TABLE "Produtividade" (
    "id" SERIAL NOT NULL,
    "funcionario" TEXT NOT NULL,
    "funcao" TEXT NOT NULL,
    "atividade" TEXT NOT NULL,
    "quantidadeS" INTEGER NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "quantidade_Palets" INTEGER NOT NULL,

    CONSTRAINT "Produtividade_pkey" PRIMARY KEY ("id")
);

import { PrismaClient } from '@prisma/client';
import { UnauthorizedError, InsufficientBalance } from '../errors';
import { ITransaction, ITransactionData } from '../interfaces/ITransaction';
import { ITransactionFilter } from '../interfaces/ITransactionFilter';
import ITransactionModel from '../interfaces/ITransactionModel';

class TransactionModel implements ITransactionModel {
  private readonly prisma: PrismaClient;
  constructor (prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async create ({ accountToDebit, transactionValue, userAccountId }: ITransactionData): Promise<string | null> {
    const { account: { balance }, id: debitedUserId } = await this.prisma.user.findUniqueOrThrow({
      where: {
        id: userAccountId
      },
      include: {
        account: true
      }
    });

    const { id: creditedUserId } = await this.prisma.user.findUniqueOrThrow({
      where: {
        username: accountToDebit
      }
    });

    if (debitedUserId === creditedUserId) throw new UnauthorizedError();

    if (balance < transactionValue) throw new InsufficientBalance();

    const { id: transactionId, value } = await this.prisma.transaction.create({
      data: {
        createdAt: new Date(),
        value: transactionValue,
        creditedAccountId: creditedUserId,
        debitedAccountId: debitedUserId
      }
    });

    await this.prisma.transaction.update({
      data: {
        creditedAccount: {
          update: {
            balance: {
              increment: value
            }
          }
        },
        debitedAccount: {
          update: {
            balance: {
              decrement: value
            }
          }
        }
      },
      where: {
        id: transactionId
      }
    });

    return 'Transaction created with success';
  }

  public async getTransactions (userId: number, filters: ITransactionFilter): Promise<ITransaction[]> {
    const gte = new Date(filters.date ?? '2000-01-01');
    const lte = new Date(filters.date ?? Date.now());

    if (filters.date) lte.setDate(gte.getDate() + 1);

    const res = await this.prisma.transaction.findMany({
      where: {
        createdAt: { gte, lte },
        creditedAccountId: filters['cash-in'] ? userId : undefined,
        debitedAccountId: filters['cash-out'] ? userId : undefined,
        OR: [
          {
            creditedAccountId: userId
          },
          {
            debitedAccountId: userId
          }
        ]
      },
      select: {
        value: true,
        createdAt: true,
        creditedAccount: {
          select: {
            User: {
              select: {
                username: true
              }
            }
          }
        },
        debitedAccount: {
          select: {
            User: {
              select: {
                username: true
              }
            }
          }
        }
      }
    });

    return res as unknown as ITransaction[];
  }
}

// const teste = async (): Promise<void> => {
//   try {
//     const model = new TransactionModel(new PrismaClient());
//     const res = await model.getTransactions(2);
//     console.table(res);
//   } catch (error: any) {
//     console.log(error.message);
//   }
// };

// void teste();

export { TransactionModel };

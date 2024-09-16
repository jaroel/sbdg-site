import { ormFactory } from "orchid-orm-test-factory";
import { db } from "./db/db";

const factory = ormFactory(db);
export const contentObjectFactory = factory.contentObjects;

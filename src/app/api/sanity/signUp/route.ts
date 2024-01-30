import client from '@/libs/sanity'
import {signUpHandler} from 'next-auth-sanity'
import { SanityClient } from "@sanity/client";

const castedClient = client as unknown as SanityClient;

export const POST = signUpHandler(castedClient);
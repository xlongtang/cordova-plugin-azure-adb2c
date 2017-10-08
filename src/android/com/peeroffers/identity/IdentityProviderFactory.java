package com.peeroffers.identity;

import android.support.annotation.NonNull;

import com.yaoseetech.identity.DefaultIdentityProvider;
import com.yaoseetech.identity.IGlobalR;
import com.yaoseetech.identity.IIdentityProvider;

/**
 * Created by xlongtang on 5/15/2017.
 */

public class IdentityProviderFactory {

    public static final int NOT_SPECIFIED = -1;

    // Singleton
    public static IdentityProviderFactory Instance = new IdentityProviderFactory();

    // Preventing from any construction from outside.
    private IdentityProviderFactory() {
    }

    private static IIdentityProvider B2C_SignUpIn = null;

    synchronized IIdentityProvider getSignUpIn(@NonNull String tenant,
                                               @NonNull String clientId,
                                               @NonNull String redirectUri,
                                               @NonNull String policy,
                                               @NonNull String scope,
                                               IGlobalR globalRStrings) {

        if (B2C_SignUpIn == null) {
            B2C_SignUpIn = new DefaultIdentityProvider(
                    "B2C Sign Up/In",
                    true,
                    globalRStrings.getRStringId("b2c_discovery_uri"),
                    NOT_SPECIFIED, // auth endpoint is discovered
                    NOT_SPECIFIED, // token endpoint is discovered
                    NOT_SPECIFIED, // dynamic registration not supported
                    globalRStrings.getRStringId("b2c_logout_uri"),
                    tenant,
                    clientId,
                    redirectUri,
                    policy,
                    scope,
                    0,
                    globalRStrings.getRStringId("b2c_name"),
                    android.R.color.white);
        }
        return B2C_SignUpIn;
    }
}

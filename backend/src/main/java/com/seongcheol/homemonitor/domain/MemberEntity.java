package com.seongcheol.homemonitor.domain;

import java.util.HashSet;
import java.util.Set;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "member")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class MemberEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 128, unique = true)
    private String email;

    @Column(length = 16)
    private String username;

    @Column(length = 128)
    private String password;

    @OneToMany(mappedBy = "member", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<MemberRoleEntity> role = new HashSet<MemberRoleEntity>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<SocialAccountEntity> socialAccounts = new HashSet<>();

    public void addMemberRole(MemberRoleEntity memberRoleEntity) {
        this.role.add(memberRoleEntity);
        memberRoleEntity.setMember(this);
    }

    public void addSocialAccount(SocialAccountEntity socialAccountEntity) {
        this.socialAccounts.add(socialAccountEntity);
        socialAccountEntity.setMember(this);
    }
}

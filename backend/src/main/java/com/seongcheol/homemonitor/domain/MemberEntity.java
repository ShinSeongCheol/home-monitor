package com.seongcheol.homemonitor.domain;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "member")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class MemberEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 16, unique = true)
    private String name;
    @Column(length = 128)
    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "member_role", joinColumns = @JoinColumn(name = "member_id"))
    @Column(name = "role", length = 16)
    private Set<String> role = new HashSet<String>();
}

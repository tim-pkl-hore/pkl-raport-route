package id.pkl.raport.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="kkm", uniqueConstraints=@UniqueConstraint(columnNames={"kkm", "tingkat", "mata_pelajaran"}))
public class Kkm {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column
	private Long id;
	
	@NotNull
	@Column(name="kkm")
	private Integer kkm;
	
	@OneToOne
	@JoinColumn(name="tingkat", referencedColumnName="id")
	private Tingkat tingkat;
	
	@OneToOne
	@JoinColumn(name="mata_pelajaran", referencedColumnName="id")
	private MataPelajaran mataPelajaran;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getKkm() {
		return kkm;
	}

	public void setKkm(Integer kkm) {
		this.kkm = kkm;
	}

	public Tingkat getTingkat() {
		return tingkat;
	}

	public void setTingkat(Tingkat tingkat) {
		this.tingkat = tingkat;
	}

	public MataPelajaran getMataPelajaran() {
		return mataPelajaran;
	}

	public void setMataPelajaran(MataPelajaran mataPelajaran) {
		this.mataPelajaran = mataPelajaran;
	}
	
	
}
